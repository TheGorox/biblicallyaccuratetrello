import { Column, Table, Model, DataType, Default, Unique, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number // не используем UUID, т.к. url будет гигантским при запросе

    @Unique
    @Column
    nickname: string // почему бы и нет

    @Unique
    @Column
    email: string

    @Column
    password: string // хеш пароля
}