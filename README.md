1.  Display all the books of authors who live in a specific country (e.g. all books of all authors living in Bangladesh)

    {
        AuthorCountry(country:"BD"){
            author_name
            author_id
            country
            Books{
                book_title
                price
                book_id
            }
        }
    }



2.   Total number of books published by an author (e.g. total number of books sold by J. K. Rowling)



    {
        PublishedBook(publication_id:4){
            author_id
            book_id
            publication_date
            Author{
                author_name
                Books{
                    book_title
                    price
                }
            }
        }
    }


    console=> 3 number of books published by Terry Paratchet