export async function getAllPosts() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.json();
    } catch (err) {
      console.log('get all post err:', err);
    }
  }
  
  export async function createPost(newData) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response.json();
    } catch (err) {
      console.error(`Error from create post${err}`);
    }
  }
  
  export async function updatePost(editPost) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
        method: 'PUT',
        body: JSON.stringify(editPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response.json();
    } catch (err) {
      console.error(`Error from update post${err}`);
    }
  }
  
  export async function patchPost(editPost) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ title: editPost.title }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response.json();
    } catch (err) {
      console.error(`Error from patch post${err}`);
    }
  }
  
  export async function deletePost(post) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error(`Error from delete post${err}`);
    }
  }
  
  export async function filterPosts(userId) {
    try {
      const response = await fetch(userId !== 'Filter By User' ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}` : 'https://jsonplaceholder.typicode.com/posts');
      return response.json();
    } catch (err) {
      console.error(`Error from filter posts${err}`);
    }
  }
  