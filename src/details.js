import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from './carousel';
import ErrorBoundary from './errorBoundary';
import ThemeContext from './themeContext';
import { navigate } from '@reach/router';
import Modal from './modal';
import { connect } from 'react-redux';

class Details extends React.Component {
    //using hooks is not allowed

    state = { loading: true, showModal: false };

    //component methods are life cycle methods
    //componentDidMount is similar to useEffect, it runs when it first starts up and doesnt run again
    //it doesnt need dependencies like useEffect
    componentDidMount() {
        pet.animal(this.props.id).then(({ animal }) => {
            this.setState({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false,
            });
        }, console.error);
    }
    toggleModal = () => this.setState({ showModal: !this.state.showModal });
    adopt = () => navigate(this.state.url);
    //every class needs a render method or it wont work
    render() {
        if (this.state.loading) {
            return <h1>loading...</h1>;
        }

        const { animal, breed, location, description, name, media, showModal } = this.state;

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${location}`}</h2>
                    <button onClick={this.toggleModal} style={{ backgroundColor: this.props.theme }}>
                        Adopt {name}
                    </button>
                    <p>{description}</p>
                    {showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {name}</h1>
                                <div className="buttons">
                                    <button onClick={this.adopt}>Yes</button>
                                    <button onClick={this.toggleModal}>No I am a monster</button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ theme }) => ({ theme });
const WrappedDeatils = connect(mapStateToProps)(Details);

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <WrappedDeatils {...props}></WrappedDeatils>
        </ErrorBoundary>
    );
}
