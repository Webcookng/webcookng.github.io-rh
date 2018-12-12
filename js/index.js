var app = angular.module("InvoiceGenerator", []);

app.controller("InvoiceGeneratorCtrl", function($scope, $filter) {
  
  $scope.products = [{
    description: "",
    quantity: 1,
    price: 0,
    amount: 0
  }];
  $scope.subtotal = 0;
  $scope.tax = 0;
  $scope.total = 0;
  $scope.dateSent = $filter("date")(Date.now(), 'yyyy-MM-dd');
  $scope.previewMode = false;
  
  $scope.togglePreviewMode = function() {
    $scope.previewMode = !$scope.previewMode;
  }
  
  $scope.productPriceChange = function(product) {
    var indexOf = $scope.products.indexOf(product);
    
    $scope.products[indexOf].amount = $scope.products[indexOf].price * $scope.products[indexOf].quantity;
    
    $scope.subtotal = 0;
    $scope.tax = 0;
    $scope.total = 0;
    
    for (i = 0; i < $scope.products.length; i++) {
      $scope.subtotal += $scope.products[i].amount;
      $scope.tax = +(($scope.subtotal / 100) * 20).toFixed(2);
      $scope.total = +($scope.subtotal + $scope.tax).toFixed(2);      
    }
  }
  
  $scope.removeProduct = function(product) {
    
    
    var indexOf = $scope.products.indexOf(product);
    
    if (indexOf !== -1) {
      $scope.products.splice(indexOf, 1);
    }    
  }
  
  $scope.addBlankProduct = function() {
    $scope.products.push({
      description: "",
      quantity: 1,
      price: 0,
      amount: 0
    });
  }  
  
  // !! CURRENTLY UNUSED
  $scope.addProduct = function() {
    // Calculate total: cost - quantity * price
    $scope.newProduct.amount = +($scope.newProduct.quantity * $scope.newProduct.price).toFixed(2);
    
    // Add product to products array
    $scope.products.push({
      description: $scope.newProduct.description,
      quantity: $scope.newProduct.quantity,
      price: +($scope.newProduct.price).toFixed(2),
      amount: $scope.newProduct.amount
    });
    
    // Update total
    $scope.subtotal += +($scope.newProduct.amount).toFixed(2);
    $scope.tax = +(($scope.subtotal / 100) * 20).toFixed(2);
    $scope.total = +($scope.subtotal + $scope.tax).toFixed(2);
    
    // Clear new product values
    $scope.newProduct.description = "";
    $scope.newProduct.quantity = 1;
    $scope.newProduct.price = 0;
    $scope.newProduct.amount = 0;
  }
  
  // Reset invoice and form to initial state
  $scope.reset = function() {
    $scope.fromCompany = "";
    $scope.toCompany = "";
    $scope.fromAddress = "";
    $scope.toAddress = "";
    $scope.reference = "";
    $scope.dateSent = $filter("date")(Date.now(), 'yyyy-MM-dd');
    $scope.dateDue = "";
    $scope.newProduct.description = "";
    $scope.newProduct.quantity = 1;
    $scope.newProduct.price = 0;
    $scope.newProduct.amount = 0;
    $scope.products = [];
    $scope.subtotal = 0;
    $scope.tax = 0;
    $scope.total = 0;
    $scope.notes = "";
    $scope.terms = "";
    $scope.form.$setPristine();
  }
});