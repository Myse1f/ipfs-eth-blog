// import pinataSDK from '@pinata/sdk';
// const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECURITY_API_KEY);

const latestNum = 5;

export async function getBlogRoot(ipfs, bloghash) {
    const blog = await ipfs.dag.get(bloghash);
    return blog.value;
}

export async function getLatestPosts(ipfs, posts) {
    let i = 0;
    let latestPosts = [];
    while ((i<posts.length) && (i<latestNum)) {
        const post = (await ipfs.dag.get(posts[i], "/meta")).value;
        post.hash = posts[i].toString();
        latestPosts.push(post);
        i++;
    }
    return latestPosts;
}

export async function getAllPosts(ipfs, posts) {
    let allPosts = [];

    for (const post of posts) {
        const postMeta = (await ipfs.dag.get(post, "/meta")).value;
        postMeta.hash = post.toString();
        allPosts.push(postMeta);
    }

    return allPosts;
}

export async function getPost(ipfs, posthash) {
    const post = (await ipfs.dag.get(posthash)).value;
    return post;
}

export async function addNewPost(contract, account, ipfs, newPost, oldBlog) {
    const postcid = await ipfs.dag.put(newPost, {pin: true});

    let posts = oldBlog.posts; 
    posts.splice(0,0,postcid.toString()); 
    const newBlog = {
        posts: posts
    }

    const blogcid = await ipfs.dag.put(newBlog, {pin: true});
    await contract.set(blogcid.toString(), {from: account});
    // const {IpfsHash} = await pinata.pinJSONToIPFS(newBlog, {pinataOptions: {cidVersion: 1}});

    return posts;
}

export async function editPost(contract, account, ipfs, newPost, postcid, oldBlog) {
    let posts = oldBlog.posts;
    const idx = posts.indexOf(postcid);
    const newcid = await ipfs.dag.put(newPost, {pin: true});
    posts.splice(idx, 1, newcid.toString()); 
    const newBlog = {
        posts: posts
    };
    const blogcid = await ipfs.dag.put(newBlog, {pin: true});
    await contract.set(blogcid.toString(), {from: account});

    return posts;
}

export async function deletePost(contract, account, ipfs, postcid, oldBlog) {
    let posts = oldBlog.posts;
    const delidx = posts.indexOf(postcid);
    posts.splice(delidx, 1); 
    const newBlog = {
        posts: posts
    };
    const blogcid = await ipfs.dag.put(newBlog, {pin: true});
    await contract.set(blogcid.toString(), {from: account});

    return posts;
}

