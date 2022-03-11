
export enum PermissionsUsers {
    /* vendas */
    vendas_ver = 0x000001,
    vendas_editar = 0x000002,
    vendas_excluir = 0x000004,

    /* compras */
    compras_ver = 0x000010,
    compras_editar = 0x000020,
    compras_excluir = 0x000040,

    /* estoque */
    estoque_ver = 0x000100,
    estoque_editar = 0x000200,
    estoque_excluir = 0x000400,

    /* financeiro */
    financeiro_ver = 0x001000,
    financeiro_editar = 0x002000,
    financeiro_excluir = 0x004000,

    /* expedicao */
    expedicao_ver = 0x010000,
    expedicao_editar = 0x020000,
    expedicao_excluir = 0x040000,

    /* rh */
    rh_ver = 0x100000,
    rh_editar = 0x200000,
    rh_excluir = 0x400000,
}