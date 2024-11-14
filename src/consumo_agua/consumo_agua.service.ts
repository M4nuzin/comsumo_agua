import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
    private consumos: ConsumoAgua[] = [];

    registrarConsumo(consumo: ConsumoAgua): ConsumoAgua {
        this.consumos.push(consumo);
        return consumo;
    }

    obterHistorico(usuarioId: string, inicio: Date, fim: Date): ConsumoAgua[] {
        return this.consumos.filter(consumo =>
            consumo.usuarioId === usuarioId &&
            new Date(consumo.dataLeitura) >= inicio &&
            new Date(consumo.dataLeitura) <= fim            
        );
    }

    verificarAlerta(usuarioId: string): boolean {
        try {
            const consumosUsuario = this.consumos
                .filter(consumo => consumo.usuarioId === usuarioId)
                .sort((a, b) => new Date(b.dataLeitura).getTime() - new Date(a.dataLeitura).getTime());
    
            if (consumosUsuario.length < 2) return false;
    
            const ultimoMes = consumosUsuario[0].quantidade;
            const mesAnterior = consumosUsuario[1].quantidade;
    
            return ultimoMes > mesAnterior;
        } catch (error) {
            console.error("Erro ao verificar alerta:", error);
            throw new Error("Erro ao verificar alerta");
        }
    }
}
