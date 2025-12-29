import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../services/data';
import { User, Post, Comment } from '../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  profileUser: User | null = null;
  currentUser: User | null = null;
  userPosts: Post[] = [];
  
  
  isEditing = false;
  editBio = '';
  editPhotoUrl = '';

  
  editingPostId: number | null = null;
  editPostContent: string = '';
  editingCommentId: number | null = null;
  editCommentContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username) {
        this.loadProfile(username);
      }
    });
  }

  loadProfile(username: string) {
    this.currentUser = this.dataService.getCurrentUser();
    const allUsers = this.dataService.getUsers();
    this.profileUser = allUsers.find((u: any) => u.username === username) || null;

    if (this.profileUser) {
      this.loadUserPosts(username);
      this.editBio = this.profileUser.bio || '';
      this.editPhotoUrl = this.profileUser.profilePhotoUrl || '';
    }
  }

  loadUserPosts(username: string) {
    const allPosts = this.dataService.getPosts();
    this.userPosts = allPosts.filter(p => p.authorUsername === username);
  }

  isOwnProfile(): boolean {
    return this.currentUser?.username === this.profileUser?.username;
  }

 
  updateProfile() {
    if (this.profileUser && this.isOwnProfile()) {
      this.profileUser.bio = this.editBio;
      this.profileUser.profilePhotoUrl = this.editPhotoUrl;
      
      
      const allUsers = this.dataService.getUsers();
      const userIndex = allUsers.findIndex((u: any) => u.username === this.profileUser?.username);
      if (userIndex !== -1) {
        allUsers[userIndex] = this.profileUser;
        localStorage.setItem('users', JSON.stringify(allUsers));
        this.dataService.setCurrentUser(this.profileUser);
        this.isEditing = false;
        alert('Profil güncellendi!');
      }
    }
  }

  deleteAccount() {
    if (confirm('Hesabını kalıcı olarak silmek istediğine emin misin?')) {
      if (this.profileUser) {
        this.dataService.deleteUser(this.profileUser.username);
        window.location.href = '/login'; 
      }
    }
  }

  

  
  saveChangesToStorage(updatedPost: Post) {
    const allPosts = this.dataService.getPosts();
    const index = allPosts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      allPosts[index] = updatedPost;
      this.dataService.updatePosts(allPosts);
    }
  }

  
  deletePost(post: Post) {
    if(confirm('Bu postu silmek istediğine emin misin?')) {
      let allPosts = this.dataService.getPosts();
      allPosts = allPosts.filter(p => p.id !== post.id); 
      this.dataService.updatePosts(allPosts); 
      
      
      this.userPosts = this.userPosts.filter(p => p.id !== post.id);
    }
  }

  
  likePost(post: Post) {
    if (!this.currentUser) return;
    const index = post.likes.indexOf(this.currentUser.username);
    if (index === -1) post.likes.push(this.currentUser.username);
    else post.likes.splice(index, 1);
    
    this.saveChangesToStorage(post);
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
    this.saveChangesToStorage(post);
  }

  
  startEditPost(post: Post) {
    this.editingPostId = post.id;
    this.editPostContent = post.content;
  }

  saveEditPost(post: Post) {
    post.content = this.editPostContent;
    this.editingPostId = null;
    this.saveChangesToStorage(post);
  }

  
  deleteComment(post: Post, commentId: number) {
    if(confirm('Yorumu silmek istiyor musun?')) {
      post.comments = post.comments.filter(c => c.commentId !== commentId);
      this.saveChangesToStorage(post);
    }
  }

  startEditComment(comment: Comment) {
    this.editingCommentId = comment.commentId;
    this.editCommentContent = comment.content;
  }

  saveEditComment(comment: Comment, post: Post) {
    comment.content = this.editCommentContent;
    this.editingCommentId = null;
    this.saveChangesToStorage(post);
  }
}