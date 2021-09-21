const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
    GraphQLInt
} = graphql

//dummydata

var books = [
    { book_title: 'book_title of the Wind', price: '300', book_id: '1', author_id: '1' },
    { book_title: 'The Final Empire', price: '220', book_id: '2', author_id: '2' },
    { book_title: 'The Long Earth', price: '150', book_id: '3', author_id: '3' },
    { book_title: 'The Hero of Ages', price: '299', book_id: '4', author_id: '2' },
    { book_title: 'The Color of Magic', price: '299', book_id: '5', author_id: '3' },
    { book_title: 'The Light of Tomas', price: '150', book_id: '5', author_id: '3' }
]

var authors = [
    { author_name: "Patrick Rothfuss", country: "BD", author_id: "1" },
    { author_name: "Brandon Sanderson", country: "UK", author_id: "2" },
    { author_name: "Terry Paratchett", country: "BD", author_id: "3" },
]

var publication = [
    { publication_id: '1', author_id: '2', book_id: '1', publication_date: '13 Sep 2021' },
    { publication_id: '2', author_id: '1', book_id: '2', publication_date: '10 Oct 2018' },
    { publication_id: '3', author_id: '2', book_id: '2', publication_date: '28 Oct 2013' },
    { publication_id: '4', author_id: '3', book_id: '3', publication_date: '30 Sep 2000' },
    { publication_id: '5', author_id: '1', book_id: '5', publication_date: '28 feb 1999' },
    { publication_id: '6', author_id: '2', book_id: '4', publication_date: '1 Jan 2000' },
    { publication_id: '7', author_id: '3', book_id: '4', publication_date: '20 Sep 2007' },
    { publication_id: '8', author_id: '2', book_id: '2', publication_date: '19 Nov 1996' },
]

//BookType

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        book_id: { type: GraphQLID },
        book_title: { type: GraphQLString },
        price: { type: GraphQLInt },
        author_id: {
            type: AuthorType,
            resolve(parent, args) {
                //console.log(parent)
                return _.find(authors, { author_id: parent.author_id })
            }
        }
    })
})

//AuthType

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        author_id: { type: GraphQLID },
        author_name: { type: GraphQLString },
        country: { type: GraphQLString },
        Books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { author_id: parent.author_id})
            }
        }
    })
})

//PublicationType

/* const PublicationType = new GraphQLObjectType({
    name: 'PublishedBook',
    fields: () => ({
        publication_id: { type: GraphQLID },
        author_id: { type: GraphQLID },
        book_id: { type: GraphQLID },
        publication_date: { type: GraphQLString },
        Author: { 
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { author_id: parent.author_id })
            }
        },
        Books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { author_id: parent.author_id })
            }
        }
    })
}) */


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        Book: {
            type: BookType,
            args: { book_id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { book_id: args.book_id })
            }
        },
        Author: {
            type: AuthorType,
            args: { author_id: { type: GraphQLID } },
            resolve(parent, args) {

                return _.find(authors, { author_id: args.author_id })
            }
        },
        AuthorCountry:{
            type: new GraphQLList(AuthorType),
            args:{ country: { type: GraphQLString } },
            resolve(parent,args){
                return _.filter(authors,{country:args.country})
            }
        }
        /* PublishedBook: {
            type: PublicationType,
            args: { publication_id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(publication, {publication_id: args.publication_id})
            }
        } */
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})
