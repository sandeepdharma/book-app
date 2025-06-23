export const getBooksQuery = `
SELECT
    b.id AS book_id,
    b.book_title,
    b.book_description,
    b.book_image,
    b.createdAt,

    p.id AS publisher_id,
    p.publisher_name,
    p.location,

    a.id as author_id,
    a.author_name,
    a.gender,
    a.bio,

    l.id as librarian_id,
    l.librarian_name
FROM
    books b
    JOIN publishers p ON b.publisher_id = p.id
    join authors a ON b.author_id = a.id
    JOIN librarians l ON b.librarian_id = l.id
WHERE
    b.id = ?`;

export const insertNewBook = `
INSERT INTO
    books (
        book_title,
        book_description,
        book_image,
        createdAt,
        publisher_id,
        author_id,
        librarian_id
    )
VALUES
    (?, ?, ?, ?, ?, ?, ?);`;

export const getBooksById = `SELECT * FROM books where id = ?`;

export const booksByPublsiher = `SELECT * FROM books WHERE publisher_id = ? `;
export const booksByAuthor = `SELECT * FROM books WHERE author_id = ? `;
export const booksByLibrarian = `SELECT * FROM books WHERE librarian_id = ? `;

export const universal_search = `
  SELECT 
    b.*,
    p.publisher_name,
    a.author_name
  FROM books b
  JOIN publishers p ON b.publisher_id = p.id
  JOIN authors a ON b.author_id = a.id
  WHERE
    LOWER(p.publisher_name) LIKE LOWER(CONCAT('%', ?, '%'))
    OR LOWER(a.author_name) LIKE LOWER(CONCAT('%', ?, '%'))
    OR LOWER(b.book_title) LIKE LOWER(CONCAT('%', ?, '%'))
  ORDER BY b.createdAt ASC
  LIMIT ? OFFSET ?;
`;
