// ----------------------------------------------------------------
// Purpose:
// This library implements the Book class.
//
// References:
// - https://gatekeeperpress.com/parts-of-a-book/
//
// Title:
// The title page contains the title of the book, the subtitle,
// the author or authors, and the publisher.
//
// Copyright page:
// The copyright page, or edition notice, contains the copyright notice,
// the Library of Congress catalog identification, the ISBN, the edition,
// any legal notices, and credits for book design, illustration, photography
// credits, or to note production entities. The copyright page may contain
// contact information for individuals seeking to use any portions of the
// work to request permission.
//
// Dedication:
// The dedication page allows the author to honor an individual or individuals.
// The dedication is usually a short sentence or two.
//
// Table of contents
// The table of contents outlines the book’s body of work by dividing it into
// chapters, and sometimes sections or parts. Much thought goes into the titles
// of the chapters, as the chapter titles can set the tone for the book. When
// someone quickly glances through the table of contents, they should be able
// to discern the scope and basic theme of the book.
//
// Foreword:
// The foreword is a short section written by someone other than the author
// that summarizes or sets up the theme of the book. The person who writes
// the foreword is often an eminent colleague or associate, a professional
// who has had personal interaction with the author.
//
// Acknowledgments:
// This page allows the author to express thanks to individuals who may have
// inspired them, contributed research or data, or helped them during the
// writing process. Acknowledgments are a public thank you for the support
// and contributions of individuals who were involved in the project.
//
// Preface or Introduction:
// The author explains the purpose behind writing the book, personal experiences
// that are pertinent to the book, and describes the scope of the book. An
// introduction can be deeply personal, seeking to draw the reader into the
// book on an emotional level, and usually explains why the book was written.
// For scholarly works, the preface or introduction helps erect a framework
// for the content that follows, as well as to explain the author’s point of
// view or thesis.
//
// Afterword or Epilogue
// With works of fiction, the prologue is written in the voice of a character
// from the story and sets the scene prior to the first chapter. This section
// may describe the setting of the story or the background details and helps
// launch the story.
// ----------------------------------------------------------------

import { Author } from './author'
import { Model } from './base'
import { Block } from './block'
import { Chapter } from './chapter'
import { Text } from './text'

export class Book {
    static readonly TYPE: string = "Book"
    public readonly title: Text
    public readonly chapters: Array<Chapter>
    public readonly authors: Array<Author>
    public readonly foreword : Array<Block>
    public readonly afterword: Array<Block>
    public readonly acknowledgments: Array<Block>
    public readonly legal: Array<Block>
    public readonly prologue: Array<Block>

    // Lazy constructor.
    constructor() {
        this.chapters = new Array<Chapter>()
        this.authors = new Array<Author>()
        this.foreword = new Array<Block>()
        this.afterword = new Array<Block>()
        this.acknowledgments = new Array<Block>()
        this.prologue = new Array<Block>()
        this.legal = new Array<Block>()
        this.title = new Text()
    }
}
