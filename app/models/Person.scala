package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Person(id: Long = 0, name: String, age: Int)

object Person {

  def makePerson(name: String, age: Int) = Person(name = name, age = age)

  implicit val reads: Reads[Person] = (
  (__ \ "name").read[String] and
  (__ \ "age").read[Int]
   )(makePerson _)

  implicit val writes: Writes[Person] = (
  (__ \ "id").write[Long] and
  (__ \ "name").write[String] and
  (__ \ "age").write[Int]
   )(unlift(Person.unapply))
}