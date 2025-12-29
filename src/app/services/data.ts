import { Injectable } from '@angular/core';
import { User, Post } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getUsers(): User[] {
    const usersString = localStorage.getItem('users');
    return usersString ? JSON.parse(usersString) : [];
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  deleteUser(username: string): void {
    let users = this.getUsers();
   
    users = users.filter(u => u.username !== username);
    localStorage.setItem('users', JSON.stringify(users));
    

    const current = this.getCurrentUser();
    if (current && current.username === username) {
      this.logout();
    }
  }

  getPosts(): Post[] {
    const postsString = localStorage.getItem('posts');
    return postsString ? JSON.parse(postsString) : [];
  }

  addPost(post: Post): void {
    const posts = this.getPosts();
    posts.unshift(post);
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  updatePosts(posts: Post[]): void {
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}