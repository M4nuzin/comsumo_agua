import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService: ConsumoAguaService) {}

    @Post('registrar')
    registrarConsumo(@Body() consumo: ConsumoAgua): ConsumoAgua {
        return this.consumoAguaService.registrarConsumo(consumo);
    }

    @Get('historico/:usuarioId')
    obterHistorico(
        @Param('usuarioId') usuarioId: string,
        @Query('inicio') inicio: string,
        @Query('fim') fim: string
    ): ConsumoAgua[] {
        const dataInicio = new Date(inicio);
        const dataFim = new Date(fim);
        return this.consumoAguaService.obterHistorico(usuarioId, dataInicio, dataFim);
    }

    @Get('alerta/:usuarioId')
    verificarAlerta(@Param('usuarioId') usuarioId: string): { alerta: boolean } {
        const alerta = this.consumoAguaService.verificarAlerta(usuarioId);
        return { alerta };
    }
}
