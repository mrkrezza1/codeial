{
    // method to create comment via ajax
    let createComment=function(){
        let newCommentForm=$('.post-comments');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'comment',
                url:'comment/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    let newComment=newCommentForm(data.data.comment)
                    $('post-comments-list > ul').prepend(newComment)
                },error:function(err){
                    console.log(err.responseText)
                }
            })
        })

    }
    createComment();
    let newCommentDom=function(comment){
        return $(`<p class="main-${comment._id}">
        <%if(locals.user && locals.user.id==comment.user.id){%>
                <a class="delete" href="/comments/destroy/${comment.id}">X</a>
           
            <%}%>

                <p>
                ${comment.content}
                </p>
                <small class="user">
                ${comment.user.name}
                </small>
    </p>`)
    }

    let deleteComment=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $('comment-${data.data.comment_id}').remove()
                },error:function(err){
                    console.log(ajax.responseText)
                }
            })
        })
    }
}
