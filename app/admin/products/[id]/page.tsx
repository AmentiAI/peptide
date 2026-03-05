import { notFound, redirect } from 'next/navigation'
import { getProductById, updateProduct } from '@/lib/db-products'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(Number(id))
  if (!product) notFound()

  async function save(formData: FormData) {
    'use server'
    await updateProduct(Number(id), {
      name: formData.get('name') as string,
      shortName: formData.get('shortName') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      longDescription: formData.get('longDescription') as string,
      benefits: ((formData.get('benefits') as string) || '').split('\n').map((s) => s.trim()).filter(Boolean),
      dosage: formData.get('dosage') as string,
      halfLife: formData.get('halfLife') as string,
      imageUrl: formData.get('imageUrl') as string,
      tags: ((formData.get('tags') as string) || '').split(',').map((s) => s.trim()).filter(Boolean),
      isActive: formData.get('isActive') === 'on',
    })
    redirect('/admin/products')
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin/products" className="text-sm text-gray-500 hover:text-gray-700">Products</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
      </div>

      <form action={save} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {[
          { name: 'name', label: 'Name', defaultValue: product.name },
          { name: 'shortName', label: 'Short Name', defaultValue: product.shortName },
          { name: 'category', label: 'Category', defaultValue: product.category },
          { name: 'dosage', label: 'Dosage', defaultValue: product.dosage },
          { name: 'halfLife', label: 'Half Life', defaultValue: product.halfLife },
          { name: 'imageUrl', label: 'Image URL', defaultValue: product.imageUrl },
        ].map(({ name, label, defaultValue }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" name={name} defaultValue={defaultValue} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" defaultValue={product.description} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
          <textarea name="longDescription" defaultValue={product.longDescription} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
          <textarea name="benefits" defaultValue={product.benefits.join('\n')} rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input type="text" name="tags" defaultValue={product.tags.join(', ')} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={product.isActive} className="rounded" />
          <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <a href="/admin/products" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</a>
          <button type="submit" className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </form>
    </div>
  )
}
