import { Repository } from 'typeorm';
import { TasasCambio, Divisas } from 'src/entities';

export async function getUSDtoBSRate(repository: Repository<TasasCambio>): Promise<number | null> {
  const result = await repository
    .createQueryBuilder("tasas_cambio")
    .select("tasa_inversa")
    .where("divisa = :valorDivisa", { valorDivisa: 15 })
    .orderBy("id", "DESC")
    .limit(1)
    .getRawOne();

  return result ? result.tasa_inversa : null;
}

export async function getCOPtoBsRate(repository: Repository<Divisas>): Promise<number | null> {
  const result = await repository
    .createQueryBuilder("divisas")
    .select("cambio_unico")
    .where("id_divisa = :idDivisa", { idDivisa: 20 })
    .getRawOne();

  return result ? parseFloat(result.cambio_unico) : null;
}

export async function convertToBolivares(
  costo: number,
  monedaBase: number,
  tasasRepository: { usdToBs: Repository<TasasCambio>, copToBs: Repository<Divisas> }
): Promise<number> {
  let tasa: number | null = null;

  if (monedaBase === 20) {
    // Si es peso colombiano, obtenemos la tasa de COP a BS y dividimos
    tasa = await getCOPtoBsRate(tasasRepository.copToBs);
    return tasa ? costo / tasa : costo;
  } else {
    // Si es dólar, obtenemos la tasa de USD a BS y multiplicamos
    tasa = await getUSDtoBSRate(tasasRepository.usdToBs);
    return tasa ? costo * tasa : costo;
  }
}
