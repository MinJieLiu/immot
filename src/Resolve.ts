/* prettier-ignore */
type ResolveLevel1<D, K1> =
  D extends (infer L)[] ? (K1 extends number ? L : never) :
    D extends object ? (K1 extends keyof D ? D[K1] : never) :
      never

// prettier-ignore
type ResolveLevel2<D, K1, K2> = ResolveLevel1<ResolveLevel1<D, K1>, K2>;
// prettier-ignore
type ResolveLevel3<D, K1, K2, K3> = ResolveLevel1<ResolveLevel2<D, K1, K2>, K3>;
// prettier-ignore
type ResolveLevel4<D, K1, K2, K3, K4> = ResolveLevel1<ResolveLevel3<D, K1, K2, K3>, K4>;
// prettier-ignore
type ResolveLevel5<D, K1, K2, K3, K4, K5> = ResolveLevel1<ResolveLevel4<D, K1, K2, K3, K4>, K5>
// prettier-ignore
type ResolveLevel6<D, K1, K2, K3, K4, K5, K6> = ResolveLevel1<ResolveLevel5<D, K1, K2, K3, K4, K5>, K6>
// prettier-ignore
type ResolveLevel7<D, K1, K2, K3, K4, K5, K6, K7> = ResolveLevel1<ResolveLevel6<D, K1, K2, K3, K4, K5, K6>, K7>

type Resolve<D, KS> =
  KS extends readonly[infer K1] ? ResolveLevel1<D, K1> :
    KS extends readonly[infer K1, infer K2] ? ResolveLevel2<D, K1, K2> :
      KS extends readonly[infer K1, infer K2, infer K3] ? ResolveLevel3<D, K1, K2, K3> :
        KS extends readonly[infer K1, infer K2, infer K3, infer K4] ? ResolveLevel4<D, K1, K2, K3, K4> :
          KS extends readonly[infer K1, infer K2, infer K3, infer K4, infer K5] ? ResolveLevel5<D, K1, K2, K3, K4, K5> :
            KS extends readonly[infer K1, infer K2, infer K3, infer K4, infer K5, infer K6] ? ResolveLevel6<D, K1, K2, K3, K4, K5, K6> :
              KS extends readonly[infer K1, infer K2, infer K3, infer K4, infer K5, infer K6, infer K7] ? ResolveLevel7<D, K1, K2, K3, K4, K5, K6, K7> :
                never

export default Resolve;
