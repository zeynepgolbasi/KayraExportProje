using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Product>> GetAllProductsAsync() => await _repository.GetAllAsync();
        public async Task<Product> GetProductByIdAsync(int id) => await _repository.GetByIdAsync(id);
        public async Task AddProductAsync(Product product) => await _repository.AddAsync(product);
        public async Task UpdateProductAsync(Product product) => await _repository.UpdateAsync(product);
        public async Task DeleteProductAsync(int id) => await _repository.DeleteAsync(id);

    }
}
