const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("event", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    large_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    privateEvent_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    virtualURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    age_range: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ALL PUBLIC",
      validate: {
        customValidator: (value) => {
          const enums = ["ALL PUBLIC", "+13", "+16", "+18"];
          if (!enums.includes(value)) {
            throw new Error("not a valid option");
          }
        },
      },
    },
    price: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    guests_capacity: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    stock_ticket: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    low_stock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    typePack:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        customValidator: (value) => {
          const enums = [
            "CLASSIC",
            "PREMIUM",
             null,
          ];
          if (!enums.includes(value)) {
            throw new Error("The option is not valid, only CLASSIC and PREMIUM are valid.");
          }
        },
      },
    },
    placeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    advertisingTime_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    adversiting_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cover_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disability_access: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    smoking_zone: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    pet_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isToday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isNextWeekend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
