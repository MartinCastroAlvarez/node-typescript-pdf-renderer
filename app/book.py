""" Book. """

import yaml


class Book:
    """ Book. """

    def __init__(self, name: str) -> None:
        """ Content constructor. """
        if not name:
            raise ValueError("Missing content name.")
        if not isinstance(name, str):
            raise TypeError("Invalid content name type.")
        self.name: str = name

    def __repr__(self) -> str:
        """ String serializer. """
        return f"<{self.__class__.__name__}: {self.name}>"
