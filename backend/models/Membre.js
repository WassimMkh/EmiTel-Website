import mongoose from "mongoose";

const membreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
      minlength: [2, "Name too short"],
      maxlength: [80, "Name too long"],
      match: [/^[a-zA-ZÀ-ÿ\s'’-]{2,80}$/, "Invalid characters in name"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone required"],
      trim: true,
      match: [/^\+?[0-9\s()-]{6,20}$/, "Invalid phone number"],
    },
    filiere: {
      type: String,
      required: [true, "Filière required"],
      trim: true,
      enum: {
        values: [
          "Civil",
          "Electrique",
          "Industriel",
          "Informatique",
          "Mecanique",
          "Mineral",
          "MIS",
          "Procédé Industriel",
          "Réseaux & Télécoms",
          "Other",
        ],
        message: "{VALUE} is not a valid filière",
      },
    },
    cellule: {
      type: String,
      required: [true, "Cellule required"],
      trim: true,
      enum: {
        values: [
          "Conception",
          "Événement",
          "IT",
          "Logistique",
          "Média",
          "Network Training",
          "Projet",
          "Revue",
          "Sponsoring",
          "Telecommunication training",
          "Other",
        ],
        message: "{VALUE} is not a valid cellule",
      },
    },
  },
  {
    timestamps: true,
    collection: "NewMembers",
  }
);


membreSchema.index({ email: 1 }, { unique: true });


membreSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Membre", membreSchema);
