import { Entity, UniqueEntityID } from '.';

interface ExampleProps {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Example extends Entity<ExampleProps> {
  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  static create(props: ExampleProps, id?: UniqueEntityID) {
    const example = new Example(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return example;
  }
}
