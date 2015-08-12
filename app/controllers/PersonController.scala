package controllers

import javax.inject._

import dal._
import play.api.i18n._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.mvc._

import scala.concurrent.ExecutionContext

class PersonController @Inject()(repo: PersonRepository, val messagesApi: MessagesApi)
                                (implicit ec: ExecutionContext) extends Controller with I18nSupport {

  def index() = Action {
    Redirect("/index.html")
  }

  case class PersonCaseClass(name: String, age:Int)

  implicit val personReads: Reads[PersonCaseClass] = (
  (JsPath \ "name").read[String] and (JsPath \ "age").read[Int]
)(PersonCaseClass.apply _)

  /**
   * The add person action.
   *
   * This is asynchronous, since we're invoking the asynchronous methods on PersonRepository.
   */
  def addPerson = Action.async(parse.json) { implicit request =>
    scala.concurrent.Future {
      val personResult = request.body.validate[PersonCaseClass]
      personResult.fold(
        errors => {
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))
        },
        PersonCaseClass => {
          repo.create(PersonCaseClass.name, PersonCaseClass.age)
          Ok(Json.obj("status" -> "OK", "message" -> ("Person '" + PersonCaseClass.name + "' saved.")))
        }
      )
    }
  }

  /**
   * A REST endpoint that gets all the people as JSON.
   */
  def getPersons = Action.async {
    repo.list().map { people =>
      Ok(Json.toJson(people))
    }
  }
}
