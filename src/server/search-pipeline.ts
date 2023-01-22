export interface Corpus<D extends Document = Document> {
  id: string

  name: string
  slug: string
  desc?: string

  type: CorpusType
  sourceUrl?: string

  documents: D[]
}

export interface Document {
  id: string
  corpusId: string

  name: string
  slug: string
  desc?: string

  sourceUrl?: string
  mimeType: string
  data: string
}

export type CorpusType = 'newsletter' | 'docs'

export abstract class ASearchProvider<
  D extends Document = Document,
  C extends Corpus<D> = Corpus<D>
> {
  abstract get name(): string
  abstract get slug(): string

  abstract get corpus(): C

  abstract init(corpus: C): Promise<void>

  abstract indexCorpus(): Promise<void>

  abstract search(query: string): Promise<void>

  async close(): Promise<void> {
    // optional override for search providers to clean up
  }
}

export class AlgoliaSearchProvider extends ASearchProvider {
  protected _corpus: Corpus<Document>

  constructor() {
    super()
    this._corpus = null
  }

  override get name(): string {
    return 'algolia'
  }

  override get slug(): string {
    return 'algolia'
  }

  override get corpus(): Corpus {
    return this._corpus
  }

  override async init(corpus: Corpus): Promise<void> {
    this._corpus = corpus

    // TODO
  }

  override async indexCorpus(): Promise<void> {
    // TODO
  }

  override async search(query: string): Promise<void> {
    // TODO
  }
}
