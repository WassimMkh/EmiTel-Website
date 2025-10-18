import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";

export const securityMiddleware = (app) => {
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(helmet());

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"], 
      },
    })
  );

 
  app.use(
    mongoSanitize({
      replaceWith: "_",
      onSanitize: ({ req, key }) => {
        console.warn(`Sanitized request key ${key} for ${req.path}`);
      },
    })
  );

  
  app.use(xss());

 
  app.use(hpp());

  
  const globalLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: parseInt(process.env.GLOBAL_RATE_MAX || "400", 10),
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, try again later.",
  });
  app.use(globalLimiter);

 
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production" && req.header("x-forwarded-proto") !== "https") {
      return res.redirect(`https://${req.header("host")}${req.url}`);
    }
    next();
  });

  console.log("Security middleware applied");
};
