<?php
    require __DIR__ . '/vendor/autoload.php';

    use Ratchet\ConnectionInterface;
    use Ratchet\Server\IoServer;

   
    class pktConnect {
        protected $clients;

       
        public function __construct() {
            $this->clients = new \SplObjectStorage;
        }
        
        public function openConnect(ConnectionInterface $conn) {
            $this->clients->attach($conn);

             echo "New connection! ({$conn->resourceId})\n";
             //return ($conn);
        }

        public function connectMessage(ConnectionInterface $from, $msg) {
            $numRecv = count($this->clients) - 1;
            echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
                , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
    
            foreach ($this->clients as $client) {
                if ($from !== $client) {
                    // The sender is not the receiver, send to each client connected
                    $client->send($msg);
                } 
            }
        }   
        public function connectClosed(ConnectionInterface $conn) {

        }

        public function connectError(ConnectionInterface $conn, \Exception $e) {
        }
     
    }
?>
   
   