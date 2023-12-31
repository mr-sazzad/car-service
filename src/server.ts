import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5001;

async function bootstrap() {
  const server: Server = app.listen(port, () => {
    console.log(`Server Listening on port http://localhost:${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {});
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  // process.on('SIGTERM', () => {
  //   logger.info('SIGTERM received');
  //   if (server) {
  //     server.close();
  //   }
  // });
}

bootstrap();
