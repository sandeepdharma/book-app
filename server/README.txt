Backend
1. Database Schema
   Books 
    {
  "_id": "book_id",
  "title": "Node.js in Depth",
  "isbn": "978-1234567890",
  "image" : "url",
  "authors": [
    {
      "name": "John Doe",
      "birthdate": "1980-01-01",
      "bio": "Full-stack developer..."
    }
  ],
  "publisher": {
    "name": "TechPress",
    "location": "USA"
  },
   "librarian": {
    "librarianId": "admin123",
    "username": "adminUser",
    "email: " ",
    "password: "",
    "resetPassword" : " ",
    "resetPasswordExpiresAt" : "",
    "role": "admin"
  },
  "reviews": "reviews": [
    {
      "userId": "u123",
      "username": "alice",
      "rating": 5,
      "comment": "Amazing book!",
      "date": "2024-06-01"
    },
    {
      "userId": "u456",
      "username": "bob",
      "rating": 4,
      "comment": "Great explanations.",
      "date": "2024-06-10"
    }
  ],
  "tags" : ["","",""]
}
utitlies
    ExisitingUser validator createdBy - userId
    Token validator
    Role-based validator - createdBy - role


AUTHENTICATION
    Sign up
    Sign in
    Forgot Password
    Reset Password
    Change Password


CRUD
Create - CRUD
    Create Login Users - librarian(user)
    
    Create Publishers - S/L
    Create Authors - S/L
    Create Book (must included with details of A, P, L) - Sa, A, L
    Submit Review for a book - AllAccess

Read - CRUD - 
    List of Books - AllAccess
    Books by pusblishers - filter
    Books by authors - filter
        Tag name,
        book name, 
        author name, 
        publisher name,
        pagination,
        sort by order book_title,
    list of authors, publishers - admin / super-admin
    Each mapped to other - Join,GROUP BY


Update - CRUD
    Update Book Details - all roles 
    Update Autor Details - Super_admin / Admin 
    Update Publisher Details - Super_admin 

Delete - CRUD 
    Delete a book - Super_admin
    Delete a reviews - Super_admin / admin 


Roles: super_admin, admin, librarian, member
member: can only read books, submit reviews
librarian: can manage books (create/update), but not delete authors/publishers
admin: can approve/reject reviews, moderate books
super_admin: full access

Loginer
    super_admin@gmail.com
    super_admin 
    super_admin 

    admin@gmail.com
    admin 
    admin 

    librarian@gmail.com
    librarian 
    librarian 

    member1@gmail.com
    member1 
    member1 

    member2@gmail.com
    member2 
    member2 

    member3@gmail.com
    member3 
    member3 








