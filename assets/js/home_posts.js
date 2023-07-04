// here now we are going to learn how to create a data and send the data with the help of the ajax

// method to submit the form data for new post  using AJAX
{
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost=newPostDom(data.data.post);
                    $('post-list-container>ul').prepend(newPost)
                    deletePost($('delete-post-button',newPost))
                    },
                error: function (err) {
                    console.log(err.responseText)
                }
            })
        })
    }
    // method to create a post in the DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">

        <p class="main-post ">
                <small class="delete">
                    <a class="delete-post-button" href="/posts/destroy/ ${post._id}">X</a>
                </small>
                <%}%>
    
                    ${post.content}
    
                        <small class="user">
                           ${post.user.name}
                        </small>
        </p>
        <div class="post-comments ">
                <form action="/comments/create" method="post">
                    <input type="text" placeholder="add comments...." name="content" required>
                    <input type="hidden" name="post" value="${ post._id}">
                    <input type="submit" value="add-comment">
                </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id}">
                        </ul>
                    </div>
        </div>
    
    </li>`);
    }
    // method to delete post from dom
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $('#post-${data.data.post_id}').remove()
                },error:function(error){
                    console.log(error.responseText)
                }
            })    
        })
    }
    createPost()

}
