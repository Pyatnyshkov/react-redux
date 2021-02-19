import React from 'react';
import Post from "./Post";
import {connect} from "react-redux";
import {fetchPosts} from "../redux/actions";

const FetchedPosts = ({fetchedPosts, fetchPosts, loading}) => {
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  } else {
    if (!fetchedPosts.length) {
      return (
        <button
          className="btn btn-primary"
          onClick={fetchPosts}
        >
          Загрузить
        </button>
      )
    }
    return fetchedPosts.map((post, index) => <Post key={index} post={post} />)
  }
};

const mapStateToProps = (state) => {
  return {
    fetchedPosts: state.posts.fetchedPosts,
    loading: state.app.loading
  }
};

const mapDispatchToProps = {
  fetchPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchedPosts)