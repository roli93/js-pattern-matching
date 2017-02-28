const sum = (list) => match (list) (
  (when= [x,...xs]) => x + sum(xs),
  (when= []) => 0,
  (when= String) => "Not an array",
  (when= "Pepe") => "It was pepe!"
)

def matchTest(x: Int): String = x match {
    case 1 => "one"
    case 2 => "two"
    case _ => "many"
}

const matchTest = (x) => match (x) (
  (when= 1) => "one",
  (when= 2) => "two",
  (when= _) => "many"
)

def sum(list: List[Int]): Int = list match {
    case List() => 0
    case x :: xs => n + sum(xs)
}

const sum = (list) => match (list) (
    (when= []) => 0,
    (when= [x, ...xs]) => n + sum(xs)
)
