package main

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Todo モデル（テーブルの構造になる）
type Todo struct {
	ID        uint   `gorm:"primaryKey" json:"id"`//ここの`gorm:"primaryKey" json:"id"`が
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var db *gorm.DB

func initDB() {
	var err error
	// ローカルのDBを繋げる
	_ = godotenv.Load()
	// DATABASE_URL は Render が自動生成してくれます
	dsn := os.Getenv("DATABASE_URL")
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// テーブルがなければ自動で作成
	db.AutoMigrate(&Todo{})
}

func createTodo(c *gin.Context) {
	var todo Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&todo)
	c.JSON(http.StatusCreated, todo)
}

func updateTodo(c *gin.Context){
	idParam := c.Param("id") 
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	
	var todo Todo
	if err := db.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	//リクエストボディを一時的な変数にバインドする
	var input Todo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
    }

	//値を更新
    todo.Title = input.Title
	todo.Completed = input.Completed

	db.Save(&todo)
	c.JSON(http.StatusOK, todo)
}

func getTodos(c *gin.Context) {
	var todos []Todo
	db.Find(&todos)
	c.JSON(http.StatusOK, todos)
}

func deleteTodo(c *gin.Context){
	idParam := c.Param("id") 
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}
	
	var todo Todo
	if err := db.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	db.Delete(&todo)
	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted"})
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	initDB()
	// 新規追加
	r.POST("/todos", createTodo)

	r.PUT("/todos/:id", updateTodo)

	// 一覧取得
	r.GET("/todos", getTodos)

	// 削除
	r.DELETE("/todos/:id", deleteTodo)

	// サーバー起動
	r.Run(":8090")
}
