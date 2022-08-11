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
	app.Post("/movie", routes.CreateMovie)
	app.Get("/movies", routes.GetAllMovies)
	app.Post("/director", routes.CreateDirector)
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
