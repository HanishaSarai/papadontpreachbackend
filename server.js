const express = require("express")
const db = require("./config/db")
const usermodel = require("./models/usermodel")
const Checkout = require("./models/checkoutModel")
const cors = require("cors")

const dollhouseData = require('./dollhousedata');
const bridalcoutureData = require('./bridalcouturedata');
const youresogoldenData = require('./youresogoldendata');
const bringyourfairytaleData = require('./bringyourownfairytaledata');
const theballadofbrideData = require('./theballadofbridedata');
const papawesternData = require('./papawesterndata');
const summersirenData = require('./summersirendata');
const sherwanidata = require('./sherwanidata');
const shirtsdata = require('./shirts');
const kidsweardata= require('./kidsweardata');


const app = express()
// app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
    res.json({ text: 'Data from backend' });
  });

  app.get('/api/dollhousedata', (req, res) => {
  res.json(dollhouseData);
  });
  app.get('/api/bridalcouturedata', (req, res) => {
  res.json(bridalcoutureData);
  });

  app.get('/api/youresogoldendata', (req, res) => {
  res.json(youresogoldenData);
  });
  app.get('/api/bringyourownfairytaledata', (req, res) => {
  res.json(bringyourfairytaleData);
  });

  app.get('/api/theballadofbridedata', (req, res) => {
  res.json(theballadofbrideData);
  });

  app.get('/api/papawesterndata', (req, res) => {
  res.json(papawesternData);
  });

  app.get('/api/summersirendata', (req, res) => {
  res.json(summersirenData);
  });

  app.get('/api/sherwanidata', (req, res) => {
  res.json(sherwanidata);
  });

  app.get('/api/shirtsdata', (req, res) => {
  res.json(shirtsdata);
  });

  app.get('/api/kidsweardata', (req, res) => {
  res.json(kidsweardata);
  });

app.get('/api/dollhousedata/:id', (req, res) => {
  const product = dollhouseData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
app.get('/api/bridalcouturedata/:id', (req, res) => {
  const product =  bridalcoutureData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/youresogoldendata/:id', (req, res) => {
  const product =  youresogoldenData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/bringyourownfairytaledata/:id', (req, res) => {
  const product =  bringyourfairytaleData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/theballadofbridedata/:id', (req, res) => {
  const product =  theballadofbrideData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/papawesterndata/:id', (req, res) => {
  const product =  papawesternData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
app.get('/api/summersirendata/:id', (req, res) => {
  const product =  summersirenData.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/sherwanidata/:id', (req, res) => {
  const product =  sherwanidata.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/shirtsdata/:id', (req, res) => {
  const product =  shirtsdata.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
app.get('/api/kidsweardata/:id', (req, res) => {
  const product =  kidsweardata.find(item => item._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const categoryDataMap = {
  dollhousecollection: dollhouseData,
  bridalcouture: bridalcoutureData,
  youresogolden: youresogoldenData,
   yoursogolden: youresogoldenData, // alias so both work
  bringyourfairytale: bringyourfairytaleData,
  theballadofbride: theballadofbrideData,
  papawestern: papawesternData,
  summersiren: summersirenData,
  sherwaani: sherwanidata,
  shirts: shirtsdata,
  kidswear : kidsweardata
  // summersiren: SummerSiren,
  // bridalcouture: BridalCouture,
  // Add other categories and their models here
};

app.get('/api/category/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const dataArray = categoryDataMap[category.toLowerCase()];
  

  // This part correctly finds data in your local JSON files
  if (dataArray) {
   const product = dataArray.find(item => item._id === id || item.id === id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: 'Product not found in this category' });
      
    }
  }

  // If the category itself isn't in the map, return a 404 error
  return res.status(404).json({ message: 'Category not found' });
  
});

app.post("/api/checkout", async (req, res) => {
  try {
    const newOrder = new Checkout(req.body);
    await newOrder.save();
    console.log("Order saved:", newOrder);
    res.status(200).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});


//routing mails
const subscriberRoutes = require('./routes/subscriber');
app.use('/api', subscriberRoutes);

//routing doll house  
const dollhouseRoutes = require('./routes/dollhouseRoutes');
app.use('/dollhousecollection', dollhouseRoutes);
    
  //routing slider categories
  const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api', categoryRoutes);

//routing youresogolden 
const youresogoldenRoutes = require('./routes/youresogoldenRoutes');
app.use('/api/youresogolden', youresogoldenRoutes);

//routing bringyourfairytale
const bringyourfairytaleRoutes = require('./routes/bringyourfairytaleRoutes');
app.use('/api/bringyourfairytale', bringyourfairytaleRoutes);

//routing theballadofbride
const theballadofbrideRoutes = require('./routes/theballadofbrideRoutes');
app.use('/theballadofbride', theballadofbrideRoutes);

//routing summersiren
const summersirenRoutes = require('./routes/summersirenRoutes');
app.use('/summersiren', summersirenRoutes);

//routing bridalcouture
const bridalcoutureRoutes = require('./routes/bridalcoutureRoutes');
app.use('/bridalcouture', bridalcoutureRoutes);

//routing papawestern
const papawesternRoutes = require('./routes/papawesternRoutes');
app.use('/papawestern', papawesternRoutes);

//routing sherwani
const sherwaniRoutes = require('./routes/sherwaniRoutes');
app.use('/sherwaani', sherwaniRoutes);

const shirtsRoutes = require('./routes/shirtsRoutes');
app.use('/shirts', shirtsRoutes);


const kidswearRoutes = require('./routes/kidswearRoutes');
app.use('/kidswear', kidswearRoutes);

//login signup routing 
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

//checkout routing

const papawestern = require("./models/papawestern")
const summersiren = require("./models/summersiren")


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(5678, () => console.log("Server running on port 5678"));