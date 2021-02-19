import React from "react";
import {connect} from 'react-redux';
import {createPost, hideError, showError} from "../redux/actions";

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;
    if (!title.trim()) {
      this.props.showError('Введите текст поста');
      return
    }
    const newPost = {
      title, id: Date.now().toString()
    };
    this.setState({title: ''});
    this.props.createPost(newPost);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            onFocus={this.props.hideError}
          />
        </div>
        <button className="btn btn-success" type='submit'>Создать</button>
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            {this.props.error}
          </div>
        )}
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  showError,
  hideError
};

const mapStateToProps = (state) => {
  return {
    error: state.app.error
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)