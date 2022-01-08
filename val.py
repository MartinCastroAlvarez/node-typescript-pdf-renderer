""" Suipacha505 Script. """

import begin

from app.compiler import Compiler
from app.book import Book


@begin.subcommand
@begin.logging
def compile(name: 'Book Name' = '') -> None:
    """ Builds a new book. """
    compiler: Compiler = Compiler()
    book: Book = Book(name)
    compiler.compile(book)


@begin.start(lexical_order=True, short_args=True)
@begin.logging
def run():
    """ Main hook. """
