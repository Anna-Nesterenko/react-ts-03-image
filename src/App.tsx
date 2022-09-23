import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImages } from "./services/services";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { SearchBar } from "./components/Search/SearchBar";
import { Loader } from "./components/Loader/Loader";
import { Button } from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

interface IState {
  images: { [key: string]: string }[];
  searchQuery: string;
  page: number;
  isLoader: boolean;
  showModal: boolean;
  //   contentModal: string;
  largeImg: string;
  tags: string;
}

export class App extends Component<{}, IState> {
  state = {
    images: [],
    searchQuery: "",
    page: 1,
    isLoader: false,
    showModal: false,
    //  contentModal: "",
    largeImg: "",
    tags: "",
  };

  toggleLoader = () => {
    this.setState(({ isLoader }) => ({ isLoader: !isLoader }));
  };

  handleFormSubmit = (searchName: string) => {
    this.setState({
      images: [],
      searchQuery: searchName,
      page: 1,
    });
  };

  /*відрісовка зображень по пошуку*/
  componentDidUpdate(_: any, { searchQuery, page }: IState) {
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getData();
    }
  }

  getData = async () => {
    try {
      this.toggleLoader();
      const { searchQuery, page } = this.state;
      const { hits } = await getImages(searchQuery, page);
      if (hits.length < 1)
        await toast.error("Sorry, this is not correct. Try it differently");

      await this.setState(({ images }) => ({
        images: [...images, ...hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.toggleLoader();
    }
  };

  addNextPage = async () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  //   private toggleModal = (image: string) => {
  //     this.setState({ contentModal: image });
  //   };
  toggleModal = (largeImg = "", tags = "") => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg,
      tags,
    }));
  };
  //   openModal = (image: string) => {
  //     this.setState({ contentModal: image, showModal: true });
  //     document.documentElement.style.overflow = "hidden";
  //   };

  //   closeModal = () => {
  //     this.setState({ contentModal: "", showModal: false });
  //     document.documentElement.style.overflow = "";
  //   };

  render() {
    const { images, isLoader, page, showModal, largeImg, tags } = this.state;

    const isNotLastPage = images.length / page === 12;
    const btnEnable = images.length > 0 && !isLoader && isNotLastPage;

    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />

        <ImageGallery pictures={images} onImgClick={this.toggleModal} />
        <ToastContainer
          style={{ top: "5em" }}
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
        {isLoader && <Loader />}
        {btnEnable && <Button onClickNextPage={this.addNextPage} />}
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={largeImg} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
