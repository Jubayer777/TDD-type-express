import request from "supertest";
import app from "../src/app";
describe("Todo API", () => {
  it("GET /todos--> array of todos", async () => {
    return await request(app)
      .get("/api/todos")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            todos: expect.arrayContaining([
              expect.objectContaining({
                _id: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                completed: expect.any(Boolean),
              }),
            ]),
          })
        );
      });
  });

  it("GET /todos/id--> specific todo", async () => {
    return await request(app)
      .get("/api/todos/6333b5cda11f67f42ccfc4ac")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            todo: expect.objectContaining({
              _id: expect.any(String),
              name: expect.any(String),
              description: expect.any(String),
              completed: expect.any(Boolean),
            }),
          })
        );
      });
  });

  //   it("POST /todos--> create todo", async () => {
  //     return await request(app)
  //       .post("/api/todos")
  //       .send({
  //         name:"todo-4",
  //         description:"todo description 4"
  //       })
  //       .expect(201)
  //       .expect("Content-Type", /json/)
  //       .then((response) => {
  //         expect(response.body).toEqual(
  //           expect.objectContaining({
  //             success: true,
  //             todo: expect.objectContaining({
  //               _id: expect.any(String),
  //               name: expect.any(String),
  //               description: expect.any(String),
  //               completed: expect.any(Boolean),
  //             }),
  //           })
  //         );
  //       });
  //   });

  //   it("GET /todos--> no todos found", async () => {
  //     return await request(app)
  //       .get("/api/todos")
  //       .expect(404)
  //       .expect("Content-Type", /json/)
  //       .then((response) => {
  //         expect(response.body).toEqual(
  //           expect.objectContaining({
  //             success: false,
  //             message: expect.any(String)
  //           })
  //         );
  //       });

  //   });

  it("GET /todos/id--> not found todo", async () => {
    return await request(app)
      .get("/api/todos/6332bba0ebb73e2d73aa410r")
      .expect(404)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          })
        );
      });
  });

  it("POST /todos--> Post failed", async () => {
    return await request(app)
      .post("/api/todos")
      .send({
        name: "jj",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            message: expect.any(String),
          })
        );
      });
  });
});
