import { Column, Table, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

@Table
export class BoardColumn extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    @ForeignKey(() => User)
    ownerId: number

    @BelongsTo(() => User, {
        // ставим каскадное удаление
        onDelete: 'cascade'
    })
    user: User

    @Column
    title: string
}