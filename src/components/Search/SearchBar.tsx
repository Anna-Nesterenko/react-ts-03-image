import { ChangeEvent, Component, FormEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch } from "react-icons/fi";
import { WrapperHeader, Field, BtnSearch } from "./SearchBar.styled";

interface PropTypes {
  onSubmit: any;
}

interface StateTypes {
  searchName: string;
}

export class SearchBar extends Component <PropTypes, StateTypes> {
  state = {
    searchName: "",
  };

  handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchName: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.searchName === "") {
      toast.warning("Sorry, your field is empty. Enter search name");
      return;
    }

    await this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: "" });
  };

  render() {
    return (
      <WrapperHeader>
        <form onSubmit={this.handleSubmit}>
          <BtnSearch type="submit">
            <FiSearch style={{ marginTop: 3 }}></FiSearch>
          </BtnSearch>
          <Field
            name="searchName"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchName}
            onChange={this.handleNameChange}
            placeholder="Search images..."
          />
        </form>
      </WrapperHeader>
    );
  }
}
