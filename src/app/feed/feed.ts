import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data';
import { Post, User, Comment } from '../models';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  currentUser: User | null = null;
  newPostContent: string = '';

  
  editingPostId: number | null = null; 
  editPostContent: string = ''; 
  editingCommentId: number | null = null; 
  editCommentContent: string = ''; 

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.loadPosts();
  }

  loadPosts() {
    this.posts = this.dataService.getPosts();
  }

  sharePost() {
    if (!this.newPostContent.trim()) { alert('Boş post paylaşamazsın!'); return; }
    if (this.currentUser) {
      const newPost: Post = {
        id: Date.now(),
        authorUsername: this.currentUser.username,
        content: this.newPostContent,
        likes: [],
        comments: []
      };
      this.dataService.addPost(newPost);
      this.newPostContent = '';
      this.loadPosts();
    }
  }

  logout() { this.dataService.logout(); }

  likePost(post: Post) {
    if (!this.currentUser) return;
    const index = post.likes.indexOf(this.currentUser.username);
    if (index === -1) post.likes.push(this.currentUser.username);
    else post.likes.splice(index, 1);
    this.dataService.updatePosts(this.posts);
  }

  addComment(post: Post, commentText: string) {
    if (!this.currentUser || !commentText.trim()) return;
    const newComment: Comment = {
      commentId: Date.now(),
      postId: post.id,
      authorUsername: this.currentUser.username,
      content: commentText,
      timestamp: new Date()
    };
    post.comments.push(newComment);
    this.dataService.updatePosts(this.posts);
  }

  

  
  deletePost(post: Post) {
    if(confirm('Bu postu silmek istediğine emin misin?')) {
      
      this.posts = this.posts.filter(p => p.id !== post.id);
      this.dataService.updatePosts(this.posts);
    }
  }

  
  startEditPost(post: Post) {
    this.editingPostId = post.id;
    this.editPostContent = post.content;
  }

  
  saveEditPost(post: Post) {
    post.content = this.editPostContent;
    this.editingPostId = null; 
    this.dataService.updatePosts(this.posts);
  }

  
  deleteComment(post: Post, commentId: number) {
    if(confirm('Yorumu silmek istiyor musun?')) {
      post.comments = post.comments.filter(c => c.commentId !== commentId);
      this.dataService.updatePosts(this.posts);
    }
  }

  
  startEditComment(comment: Comment) {
    this.editingCommentId = comment.commentId;
    this.editCommentContent = comment.content;
  }

  
  saveEditComment(comment: Comment, post: Post) {
    comment.content = this.editCommentContent;
    this.editingCommentId = null;
    this.dataService.updatePosts(this.posts);
  }
}