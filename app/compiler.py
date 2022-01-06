""" Book compiler. """

from app.book import Book


class Compiler:
    """ Book Compiler. """

    def __init__(self, book: Book) -> None:
        """ Content constructor. """
        if not book:
            raise ValueError("Missing book.")
        if not isinstance(book, Book):
            raise TypeError("Invalid book type.")
        self.book: Book = book

    def __repr__(self) -> str:
        """ String serializer. """
        return f"<{self.__class__.__name__}: {self.book.name}>"
