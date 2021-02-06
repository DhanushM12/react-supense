import React, {Suspense} from 'react';
import {fetchData} from './Api';

const resource = fetchData();

function App() {
  return (
    <div className="container my-5">
      <Suspense fallback={<h1>Loading Users.....</h1>}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<h1>Loading Posts.....</h1>}>
        <ProfilePosts />
      </Suspense>
     Hello World
    </div>
  );
}

const ProfileDetails = () => {
  const user = resource.user.read();
  return(
    <div className="card card-body my-3">
      <h1 className="large text-primary">
      {user.name}
      </h1>
      <ul>
        <li>Username : {user.username}</li>
        <li>Email: {user.email}</li>
        <li>City: {user.address.city}</li>
      </ul>
    </div>
  )
}

const ProfilePosts = () => {
  const posts = resource.posts.read();
  return(
    <ul className="list-group">
      <li className="list-group-item"></li>
      {
        posts.map(post => {
          <li className="list-group-item" key={post.id}>{post.title}</li>
        })
      }
    </ul>

  );
}

export default App;
