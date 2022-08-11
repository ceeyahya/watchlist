package main

import (
	"log"

	"github.com/ceeyahya/watchlist-backend/database"
	"github.com/ceeyahya/watchlist-backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func Ping(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"ping": "success",
	})
}

func setupRoutes(app *fiber.App) {
	app.Get("/", Ping)

	// Movies Endpoints
	app.Get("/movies", routes.GetAllMovies)
	app.Get("/movie/:id", routes.GetMovie)
	app.Post("/movie", routes.CreateMovie)
	app.Put("/movie/:id", routes.UpdateMovie)
	app.Delete("/movie/:id", routes.DeleteMovie)

	// Directors Endpoints
	app.Get("/directors", routes.GetAllDirectors)
	app.Get("/director/:id", routes.GetDirector)
	app.Get("/director-movies/:id", routes.GetDirectorMovies)
	app.Post("/director", routes.CreateDirector)
	app.Put("/director/:id", routes.UpdateDirector)
	app.Delete("/director/:id", routes.DeleteDirector)

	// Statistics
	app.Get("/len-directors", routes.GetLenDirectors)
	app.Get("/len-movies", routes.GetLenMovies)

}

func main() {
	database.Connect()
	app := fiber.New()

	setupRoutes(app)

	app.Use(cors.New())

	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})

	log.Fatal(app.Listen(":3000"))
}
