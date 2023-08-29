export default function Header() {
  return (
    <div className="w-5/6 mt-2  flex flex-col self-center">
    <div className="w-full h-6 rounded-t bg-slate-400 font-semibold">Materiales</div>
    <div className="flex self-center justify-center items-center bg-slate-300 border-b-2 border-slate-900 w-full text-black text-xs gap-0.5 font-medium">
      <span className="m-1 w-5">Pos</span>
      <span className=' text-center p-1 m-0.5 w-14 rounded-sm'>Cant.</span>
      <span className='w-24 p-1 m-0.5 rounded-sm'>Codigo</span>
      <span className='w-96 p-1 m-0.5 rounded-sm'>Descripción</span>
      <span className='p-1 pl-6 m-0.5 w-28 rounded-sm'> Precio unit.</span>
      <span className='p-1 pl-6 m-0.5 w-14 rounded-sm'>IVA</span>
      <span className="p-1 m-0.5 w-24 rounded-sm text-center overflow-hidden">
         Subtotal
        </span>
      <span className="w-4 h-4 mx-1"></span>
      <span className="w-4 h-4 mx-1"></span>
      <span className="w-4 h-4 mx-1"></span>
      <span className="w-4 h-4 mx-1"></span>
    </div>
    </div>
  )
}
