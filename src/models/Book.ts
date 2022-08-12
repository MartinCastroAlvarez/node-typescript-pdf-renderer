// ----------------------------------------------------------------
// Purpose:
// This library implements the Book class.
//
// References:
// - https://gatekeeperpress.com/parts-of-a-book/
//
// Title:
// The title page contains the title of the book, the subtitle,
// the person or persons, and the publisher.
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
// The dedication page allows the person to honor an individual or individuals.
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
// The foreword is a short section written by someone other than the person
// that summarizes or sets up the theme of the book. The person who writes
// the foreword is often an eminent colleague or associate, a professional
// who has had personal interaction with the person.
//
// Acknowledgments:
// This page allows the person to express thanks to individuals who may have
// inspired them, contributed research or data, or helped them during the
// writing process. Acknowledgments are a public thank you for the support
// and contributions of individuals who were involved in the project.
//
// Preface or Introduction:
// The person explains the purpose behind writing the book, personal experiences
// that are pertinent to the book, and describes the scope of the book. An
// introduction can be deeply personal, seeking to draw the yaml into the
// book on an emotional level, and usually explains why the book was written.
// For scholarly works, the preface or introduction helps erect a framework
// for the content that follows, as well as to explain the person’s point of
// view or thesis.
//
// Afterword or Epilogue
// With works of fiction, the prologue is written in the voice of a character
// from the story and sets the scene prior to the first chapter. This section
// may describe the setting of the story or the background details and helps
// launch the story.
// ----------------------------------------------------------------

import { SerializedBook } from '../serializers/Book'

import { Model } from '../interfaces/Model'

import { Chapter } from './Chapter'
import { Person } from './Person'
import { Text } from './Text'
import { Topic } from './Topic'

import { Log } from '../utils/Logging'
import { Yaml } from '../utils/Yaml'

export class Book implements Model {
    public chapters: Array<Chapter> = new Array<Chapter>()
    public authors: Array<Person> = new Array<Person>()
    public foreword: Array<Model> = new Array<Model>()
    public afterword: Array<Model> = new Array<Model>()
    public acknowledgements: Array<Text> = new Array<Text>()
    public legal: Array<Text> = new Array<Text>()
    public readonly title: Text = new Text()
    public readonly subtitle: Text = new Text()

    // String serializers.
    toString(): string {
        return `<${(this as any).constructor.name}: ${this.title.get()}>`
    }

    // Extracts topics from Chapters.
    getTopics(): Array<Topic> {
        let set: Set<string> = new Set<string>()
        return this.chapters.reduce(
            (accumulator, chapter) => accumulator.concat(chapter.getTopics()),
            []
        ).filter(
            topic => !set.has(topic.title.get()) && set.add(topic.title.get())
        )
    }

    // JSON serializers.
    serialize(): SerializedBook {
        return {
            "Type": (this as any).constructor.name,
            "Title": this.title.serialize(),
            "Subtitle": this.title.serialize(),
            "Topics": this.getTopics()?.map(topic => topic.serialize()),
            "Chapters": this.chapters?.map(chapter => chapter.serialize()),
            "Authors": this.authors?.map(person => person.serialize()),
            "Legal": this.legal?.map(block => block.serialize()),
            "Foreword": this.foreword?.map(block => block.serialize()),
            "Afterword": this.afterword?.map(block => block.serialize()),
            "Acknowledgements": this.acknowledgements?.map(block => block.serialize()),
        }
    }
    unserialize(data: SerializedBook): void {
        if (data) {
            Log.info('Loading Book', data)
            this.title.unserialize(data['Title'])
            this.subtitle.unserialize(data['Subtitle'])
            this.foreword = data['Foreword']?.map(x => <Text>Yaml.unserialize(x)) || []
            this.afterword = data['Afterword']?.map(x => <Text>Yaml.unserialize(x)) || []
            this.legal = data['Legal']?.map(x => <Text>Yaml.unserialize(x)) || []
            this.acknowledgements = data['Acknowledgements']?.map(x => <Text>Yaml.unserialize(x)) || []
            this.chapters = data['Chapters']?.map(x => <Chapter>Yaml.unserialize(x)) || []
            this.authors = data['Authors']?.map(x => <Person>Yaml.unserialize(x)) || []
        }
    }
}
