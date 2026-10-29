# Combined calculator preview

Freight source: sweetjibaby-ux/lcl-freight-calculator at 99e31aff5df3360e2ef9f99bda3d42f3304b6bec.
Tail rate/classification/storage core: Wesley-c429/cnmsbnzywt, core.js blob aec5799ac4fadaf38499e72f7b594d605a5e5497, retained without formula changes. User confirmed prior validation.

Actual invoice mode allocates inclusive invoice costs by CBM. Quote mode allocates freight excluding insurance by CBM, adds current product insurance based on its gate-in supply value and quantity (round batch insurance to cents before dividing), and adds customs by CBM. Tail charges use unrounded values until final display. Quote mode covers USD US routes supported by the original freight calculator. This preview does not incorporate all exception/accessorial inputs of the other site's advanced page.


November update: 302223_NA_Rates_For_Gate_In_2026-11-01.xlsx, FBCG Ocean FL  - Rates L/M columns; Ocean NRA 224059-NA-OCEAN-FBS-FBCG-FLOAT-2026-011. Apply by origin gate-in on/after 2026-11-01, through 2027-04-30, per supplied notification screenshot and NRA. Prior October rates are retained only for gate-in 2026-10-01 through 2026-10-31. The 005 dray PDF and 000 AL PDF are byte-identical to prior copies. PSS, drayage and Cargo Protect worksheets are unchanged. Existing 0.15% protection calculation remains based on separately confirmed WSC gate-in supply value. EIA and FSC cache not updated by this package. Detailed lane differences: ../rate-updates/2026-11.json.
