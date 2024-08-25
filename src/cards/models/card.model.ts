import { Column, Table, Model, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo } from "sequelize-typescript";
import { BoardColumn } from "src/columns/models/column.model";
import { User } from "src/users/models/user.model";

@Table
export class Card extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    @ForeignKey(() => User)
    ownerId: number

    @Column
    @ForeignKey(() => BoardColumn)
    parentColumnId: number

    @BelongsTo(() => BoardColumn, {
        // ставим каскадное удаление
        onDelete: 'cascade'
    })
    parentColumn: BoardColumn

    @Column
    text: string
}