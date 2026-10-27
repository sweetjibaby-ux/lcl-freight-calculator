# Combined calculator preview

Freight source: sweetjibaby-ux/lcl-freight-calculator at 99e31aff5df3360e2ef9f99bda3d42f3304b6bec.
Tail rate/classification/storage core: Wesley-c429/cnmsbnzywt, core.js blob aec5799ac4fadaf38499e72f7b594d605a5e5497, retained without formula changes. User confirmed prior validation.

Actual invoice mode allocates inclusive invoice costs by CBM. Quote mode allocates freight excluding insurance by CBM, adds current product insurance based on its gate-in supply value and quantity (round batch insurance to cents before dividing), and adds customs by CBM. Tail charges use unrounded values until final display. Quote mode covers USD US routes supported by the original freight calculator. This preview does not incorporate all exception/accessorial inputs of the other site's advanced page.
