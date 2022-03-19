
export enum PermissionsUsers {
    /* vendas */
    vendas_ver = 0x0000001,
    vendas_editar = 0x0000002,
    vendas_excluir = 0x0000004,

    /* compras */
    compras_ver = 0x0000010,
    compras_editar = 0x0000020,
    compras_excluir = 0x0000040,

    /* estoque */
    estoque_ver = 0x0000100,
    estoque_editar = 0x0000200,
    estoque_excluir = 0x0000400,

    /* financeiro */
    financeiro_ver = 0x0001000,
    financeiro_editar = 0x0002000,
    financeiro_excluir = 0x0004000,

    /* expedicao */
    expedicao_ver = 0x0010000,
    expedicao_editar = 0x0020000,
    expedicao_excluir = 0x0040000,

    /* rh */
    rh_ver = 0x0100000,
    rh_editar = 0x0200000,
    rh_excluir = 0x0400000,

    /* configutações */
    config_ver = 0x1000000,
    config_editar = 0x2000000,
    config_excluir = 0x4000000,
}