class Person {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`안녕하세요! 저는 ${this.name}`);
  }
}

const seungHwan = new Person("seungHwan");
seungHwan.greet();
